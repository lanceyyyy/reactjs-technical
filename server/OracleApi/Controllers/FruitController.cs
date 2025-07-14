[ApiController]
[Route("api/[controller]")]
public class FruitController : ControllerBase
{
        private readonly OracleService _oracleService;

        public FruitController(OracleService service)
        {
                _oracleService = service;
        }

        [HttpGet]
        public ActionResult Get() => Ok(_oracleService.GetInventory());

        [HttpPost]
        public ActionResult Post([FromBody] FruitModel fruit)
        {
                if (fruit == null || string.IsNullOrEmpty(fruit.Name))
                {
                        return BadRequest("Invalid fruit data.");
                }

                _oracleService.AddFruit(fruit);
                return Ok("Fruit added successfully.");
        }

        [HttpPut]
        public ActionResult Put([FromBody] FruitModel fruit)
        {
                if (fruit == null || string.IsNullOrEmpty(fruit.Name))
                {
                        return BadRequest("Invalid fruit data.");
                }

                _oracleService.UpdateFruit(fruit);
                return Ok("Fruit updated successfully.");
        }

}