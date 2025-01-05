"use server"

import path from "path"
import { promises as fs } from "fs"
import { Block } from "@/types/block"

/**
 * Getting a block source of export default
 * @param source full path of source file
 * @returns Block
 */
export async function getBlockSource(source: string): Promise<Block> {
    let code = await readFile(`${source}.tsx`)

    code = code.replaceAll("export default", "export")

    console.log(
        // replace all '/src' ord 'src' to '@' on source
        source.replaceAll(/\/?src/g, '@')
    );

    return { source, code }
}

async function readFile(...source: string[]) {
    const filepath = path.join(process.cwd(), ...source)
    return await fs.readFile(filepath, "utf-8")
}