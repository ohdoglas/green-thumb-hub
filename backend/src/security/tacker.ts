import prisma from "../prisma";

export async function trackLoginAttempt(userId: number, ipAddress: string, success: boolean) {
    const now = new Date();
    const lockUntil = success ? null : calculateLockUntil();

    let failedAttempts = 0;
    if (!success) {
        failedAttempts = await getFailedAttempts(userId) + 1;
    }

    await prisma.loginAttempt.create({
        data: {
            userId: userId,
            ipAddress: ipAddress,
            success: success,
            failedAttempts: failedAttempts,
            attemptTime: now,
            lockUntil: lockUntil
        }
    });

    if (!success) {
        await prisma.user.update({
            where: { userId: userId },
            data: { lockUntil: lockUntil }
        });
    }
}

async function getFailedAttempts(userId: number): Promise<number> {
    const recentAttempts = await prisma.loginAttempt.findMany({
        where: {
            userId: userId,
            success: false,
            attemptTime: {
                gte: new Date(Date.now() - 15 * 60 * 1000)
            }
        }
    });

    return recentAttempts.length;
}

function calculateLockUntil(): Date {
    return new Date(Date.now() + 30 * 60 * 1000);
}


export async function resetFailedAttempts(email: string) {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error("User not found");
    }

    const userId = user.userId;

    await prisma.loginAttempt.deleteMany({
        where: {
            userId: userId,
            success: false
        }
    });

    await prisma.user.update({
        where: { userId: userId },
        data: { lockUntil: null }
    });
}
