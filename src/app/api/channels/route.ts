import { NextResponse } from "next/server";
import db from '@/app/utils/db'

export async function GET(){
    try{
        const channels = await db.canal.findMany()
        return NextResponse.json({channels: channels, message: 'Canais encontrados'}, {status: 200})
    }catch{
        return NextResponse.json({error: 'Erro ao buscar os canais'}, {status: 500})
    }
}