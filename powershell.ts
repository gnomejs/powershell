import { ShellCommand, type ShellCommandOptions } from "@gnome/exec";
import { pathFinder } from "@gnome/exec/path-finder";

pathFinder.set("powershell", {
    name: "powershell",
    windows: [
        "${WinDir}\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
        "${ProgramFiles}\\PowerShell\\7\\pwsh.exe",
        "${ProgramFiles}\\PowerShell\\6\\pwsh.exe",
    ],
    linux: [
        "/usr/bin/pwsh",
        "/opt/microsoft/powershell/7/pwsh",
        "/opt/microsoft/powershell/6/pwsh",
    ],
});

/**
 * File extension for PowerShell scripts.
 */
export const PWSH_EXT = ".ps1";

/**
 * Represents a PowerShell command executed using the `pwsh` shell.
 */
export class PowerShellCommand extends ShellCommand {
    /**
     * Creates a new instance of the `PwshCommand` class.
     * @param script The PowerShell script to execute.
     * @param options The options for the shell command.
     */
    constructor(script: string, options?: ShellCommandOptions) {
        super("powershell", script.trimEnd(), options);
    }

    /**
     * Gets the file extension associated with PowerShell scripts.
     */
    get ext(): string {
        return PWSH_EXT;
    }

    /**
     * Gets the shell arguments for executing the PowerShell script.
     * @param script The PowerShell script to execute.
     * @param isFile Specifies whether the script is a file or a command.
     * @returns The shell arguments for executing the script.
     */
    getShellArgs(script: string, isFile: boolean): string[] {
        const params = this.shellArgs ?? ["-NoLogo", "-NonInteractive", "-NoProfile", "-ExecutionPolicy", "Bypass"];

        if (isFile) {
            params.push("-File", script);
        } else {
            params.push("-Command", script);
        }

        return params;
    }
}

/**
 * Executes a PowerShell script using the PwshCommand class.
 *
 * @param script - The PowerShell script to execute.
 * @param options - Optional options for the shell command.
 * @returns A new instance of the PwshCommand class.
 */
export function powershell(script: string, options?: ShellCommandOptions): PowerShellCommand {
    return new PowerShellCommand(script, options);
}
