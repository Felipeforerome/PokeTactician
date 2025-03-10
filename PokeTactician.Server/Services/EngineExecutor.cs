using System;
using System.Diagnostics;
using System.Text.Json; // For JSON serialization
using System.Collections.Generic;
using System.Threading.Tasks; // For EF data

public class EngineExecutor
{
    public string ExecuteEngine(Dictionary<string, object> inputData)
    {
        // Set up the process to run the engine
        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "python",
                Arguments = $"-m poketactician {inputData["argument"]}", // Pass JSON as an argument
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                RedirectStandardInput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            }
        };

        // Start the process
        process.Start();

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