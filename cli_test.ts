import { assertEquals as equals } from "jsr:@std/assert@^0.224.0";
import { remove, writeTextFile } from "jsr:@gnome/fs@^0.0.0/deno";
import { powershell } from "./cli.ts";

const EOL = Deno.build.os === "windows" ? "\r\n" : "\n";

Deno.test("simple inline test", async () => {
    const cmd = await powershell("Write-Host 'Hello, World!'");
    equals(cmd.text(), `Hello, World!\n`);
    equals(0, cmd.code);
});

Deno.test("multi-line inline test", async () => {
    const cmd = await powershell(`
        $a = 1
        $b = 2
        $a + $b
    `);
    equals(cmd.text(), `3${EOL}`);
    equals(0, cmd.code);
});

Deno.test("simple file test", async () => {
    await writeTextFile("test.ps1", "Write-Host 'Hello, World!'");
    try {
        // purposely add space after test.ps1
        const cmd = await powershell("test.ps1 ");
        equals(0, cmd.code);
        equals(cmd.text(), `Hello, World!\n`);
    } finally {
        await remove("test.ps1");
    }
});
