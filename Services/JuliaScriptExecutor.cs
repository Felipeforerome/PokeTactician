using System;
using System.Diagnostics;
using System.Text.Json; // For JSON serialization
using System.Collections.Generic; // For EF data

public class JuliaScriptExecutor
{
    public string ExecuteJuliaScript(Dictionary<string, object> inputData)
    {
        // Convert input data to JSON
        string jsonData = JsonSerializer.Serialize(inputData);

        // Escape JSON for safe command-line passing
        string escapedJsonData = jsonData.Replace("\"", "\\\"");

        // Path to Julia executable and script
        string juliaExecutable = Environment.GetEnvironmentVariable("JULIA_EXECUTABLE_PATH") ?? throw new Exception("JULIA_EXECUTABLE_PATH environment variable is not set.");
        string scriptPath = Environment.GetEnvironmentVariable("JULIA_SCRIPT_PATH") ?? throw new Exception("JULIA_SCRIPT_PATH environment variable is not set.");

        // Set up the process to run Julia
        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = juliaExecutable,
                Arguments = $"{scriptPath} \"{escapedJsonData}\"", // Pass JSON as an argument
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            }
        };

        // Start the process
        process.Start();

        // Read output and errors
        string output = process.StandardOutput.ReadToEnd();
        string errors = process.StandardError.ReadToEnd();

        process.WaitForExit();

        if (!string.IsNullOrEmpty(errors))
        {
            throw new Exception($"Julia script error: {errors}");
        }

        return output; // JSON result from the script
    }
}
