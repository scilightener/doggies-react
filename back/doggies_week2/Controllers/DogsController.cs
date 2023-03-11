using Microsoft.AspNetCore.Mvc;

namespace doggies_week2.Controllers;

[ApiController]
[Route("[controller]")]
public class DogsController : Controller
{
    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        return new JsonResult(DogsProvider.GetById(id));
    }

    [HttpGet]
    public IActionResult GetWithFilters([FromQuery] string beginLetter = "A", [FromQuery] string endLetter = "Z",
        [FromQuery] int beginWeight = 0, [FromQuery] int endWeight = int.MaxValue,
        [FromQuery] int beginHeight = 0, [FromQuery] int endHeight = int.MaxValue,
        [FromQuery] int beginAge = 0, [FromQuery] int endAge = int.MaxValue,
        [FromQuery] int pageId = 1, [FromQuery] int pageSize = 10)
    {
        return new JsonResult(DogsProvider.GetWithFilters(beginLetter, endLetter,
            beginWeight, endWeight, beginHeight, endHeight, beginAge, endAge,
            pageId, pageSize));
    }
}
