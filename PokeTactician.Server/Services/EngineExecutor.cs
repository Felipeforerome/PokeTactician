using System;
using System.Diagnostics;
using System.Text.Json; // For JSON serialization
using System.Collections.Generic;
using System.Threading.Tasks; // For EF data

public class EngineExecutor
{
    public async Task<string> ExecuteEngine(Dictionary<string, object> inputData)
    {
        // Set up the process to run the engine
        Process process;

        if (Environment.GetEnvironmentVariable("DOCKER") == "True")
        {
            process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "uv",
                    Arguments = $"run -- python3.12 -m poketactician {inputData["argument"]}",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    RedirectStandardInput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };
        }
        else
        {
            process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "/bin/bash",
                    Arguments = $"-c \"source /Users/felipeforero/Dev/PokeTactician/PokeTactician/.venv/bin/activate && python3.12 -m poketactician {inputData["argument"]}\"", // Activate virtual environment and run script
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    RedirectStandardInput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };
        }
        // Start the process
        await Task.Run(() => process.Start());

        // Read output and errors
        string output = process.StandardOutput.ReadToEnd();
        string errors = process.StandardError.ReadToEnd();

        if (!string.IsNullOrEmpty(errors))
        {
            throw new Exception($"Engine error: {errors}");
        }

        if (output == null)
        {
            throw new Exception("Engine output is null.");
        }

        return output; // JSON result from the script
    }
}