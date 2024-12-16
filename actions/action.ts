"use server";

import { ImageSchema, LandmarkSchema, ProfileSchema, validateWithZod } from "@/utils/schemas";
import { clerkClient, currentUser } from '@clerk/nextjs/server'
import db from '@/utils/db'
import { redirect } from "next/navigation";
import { uploadFile } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

const renderError = (error: unknown): { message: string } => {

    return {
        message: error instanceof Error ? error.message : 'An error server'
    }
}

const getMe = async () => {
    const user = await currentUser()

    if (!user) {
        throw new Error('user not sign in!')
    }

    if (!user.privateMetadata.hasProfile) {
        redirect('/profile/create')
    }

    return user
}

export const createProfileAction = async (previousState: any, formData: FormData) => {
    try {
        const user = await currentUser()

        if (!user) {
            throw new Error('Please sign in')
        }

        const rawData = Object.fromEntries(formData)
        const validateField = validateWithZod(ProfileSchema, rawData)

        await db.profile.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                profileImage: user?.imageUrl ?? '',
                firstName: validateField.firstName,
                lastName: validateField.lastName,
                username: validateField.userName
            }
        })

        const client = await clerkClient()

        await client.users.updateUserMetadata(user.id, {
            privateMetadata: {
                hasProfile: true
            }
        })

        // return { message: "Create Profile Success!!" };
    } catch (error) {
        console.log(error)
        return renderError(error)
    }
    redirect('/')
};

export const createLandmarkAction = async (previousState: any, formData: FormData): Promise<{ message: string }> => {
    try {
        const user = await getMe();
        const rawData = Object.fromEntries(formData)
        const file = formData.get('image') as File

        const validatedFile = validateWithZod(ImageSchema, { image: file })

        const validatedField = validateWithZod(LandmarkSchema, rawData)

        const fullPath = await uploadFile(validatedFile.image)

        await db.landmark.create({
            data: {
                ...validatedField,
                image: fullPath,
                profileId: user.id
            }
        })

    } catch (error) {
        console.log(error)
        return renderError(error)
    }
    redirect('/')
};

export const fetchLandmarks = async ({ search = '', category }: { search?: string, category?: string }) => {
    const landmarks = await db.landmark.findMany({
        where: {
            category,
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ]
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return landmarks
}

export const fetchLandmarksHero = async () => {
    const landmarks = await db.landmark.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        take: 5
    })

    return landmarks
}

export const fetchFavoriteId = async ({ landmarkId }: { landmarkId: string }): Promise<string | null> => {
    const user = await getMe()
    const favorite = await db.favorite.findFirst({
        where: {
            landmarkId,
            profileId: user.id
        },
        select: {
            id: true
        }
    })

    return favorite?.id || null
}

export const fetchLandmarkById = async ({ id }: { id: string }) => {
    return db.landmark.findFirst({
        where: {
            id,
        },
        include: {
            profile: true
        }
    })
}

export const toggleFavoriteAction = async (prevState: {
    landmarkId: string;
    favoriteId: string | null;
    pathname: string
}) => {
    const { landmarkId, favoriteId, pathname } = prevState
    const user = await getMe()
    try {
        if (favoriteId) {
            await db.favorite.delete({
                where: {
                    id: favoriteId
                }
            })
        } else {
            await db.favorite.create({
                data: {
                    landmarkId,
                    profileId: user.id
                }
            })
        }

        revalidatePath(pathname)
        return { message: favoriteId ? 'Removed Favorite Success' : 'Add Favorite Success' }
    } catch (error) {
        console.log(error)
        return renderError(error)
    }
}

export const fetchFavorites = async (): Promise<any> => {
    const user = await getMe()

    try {
        const favorites = await db.favorite.findMany({
            where: {
                profileId: user.id
            },
            select: {
                landmark: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        image: true,
                        price: true,
                        province: true,
                        lat: true,
                        lng: true,
                        category: true
                    }
                }
            }
        })


        return favorites.map((favorite) => favorite.landmark)
    } catch (error) {
        console.log(error)
        return renderError(error)
    }
}