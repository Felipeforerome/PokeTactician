// Controllers/JuliaController.cs
using Microsoft.AspNetCore.Mvc;

public class EngineController : ControllerBase
{
    [HttpPost("optimize")]
    public IActionResult RunEngine([FromBody] Dictionary<string, object> inputData)
    {
        try
        {
            var executor = new EngineExecutor();
            string resultJson = executor.ExecuteEngine(inputData);

            return Ok(resultJson);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error running Optimization Engine: {ex.Message}");
        }
    }
}
