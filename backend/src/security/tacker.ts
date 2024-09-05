import prisma from "../prisma";

export async function trackLoginAttempt(userId: number, ipAddress: string, success: boolean) {
    const now = new Date();
    const lockUntil = success ? null : calculateLockUntil();

    // Contar falhas recentes apenas se a tentativa falhar
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
            attemptTime: now,  // Adicione o horário da tentativa
            lockUntil: lockUntil
        }
    });

    // Atualize o campo lockUntil no modelo User apenas se a tentativa falhar
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
                gte: new Date(Date.now() - 15 * 60 * 1000) // últimos 15 minutos
            }
        }
    });

    return recentAttempts.length;
}

function calculateLockUntil(): Date {
    return new Date(Date.now() + 30 * 60 * 1000); // 30 minutos
}
