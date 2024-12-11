// Controllers/JuliaController.cs
using Microsoft.AspNetCore.Mvc;

public class JuliaController : ControllerBase
{
    [HttpPost("run-julia")]
    public IActionResult RunJulia([FromBody] Dictionary<string, object> inputData)
    {
        try
        {
            var executor = new JuliaScriptExecutor();
            string resultJson = executor.ExecuteJuliaScript(inputData);

            return Ok(resultJson);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error running Julia script: {ex.Message}");
        }
    }
}
