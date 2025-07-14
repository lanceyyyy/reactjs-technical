using Oracle.ManagedDataAccess.Client;
using System.Data;

public class OracleService
{
        private readonly string _connectionString;

        public OracleService()
        {
                _connectionString = "User Id=SYS;Password=lance123;Data Source=your_data_source";
        }

        public List<FruitModel> GetInventory()
        {
                var fruits = new List<FruitModel>();

                using (var conn = new OracleConnection(_connectionString))
                using (var cmd = new OracleCommand("SELECT Name, Type, Price, Stock FROM FruitInventory", conn))
                {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("RETURN_VALUE", OracleDbType.RefCursor).Direction = ParameterDirection.ReturnValue;

                        conn.Open();

                        var reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                                fruits.Add(new FruitModel
                                {
                                        Name = reader.GetString(0),
                                        Type = reader.GetString(1),
                                        Price = reader.GetDecimal(2),
                                        Stock = reader.GetInt32(3)
                                });
                        }
                }
                return fruits;
        }

        public void AddFruit(FruitModel fruit)
        {
                using (var conn = new OracleConnection(_connectionString))
                using (var cmd = new OracleCommand("INSERT INTO FruitInventory (Name, Type, Price, Stock) VALUES (:name, :type, :price, :stock)", conn))
                {
                        cmd.Parameters.Add(new OracleParameter("name", fruit.Name));
                        cmd.Parameters.Add(new OracleParameter("type", fruit.Type));
                        cmd.Parameters.Add(new OracleParameter("price", fruit.Price));
                        cmd.Parameters.Add(new OracleParameter("stock", fruit.Stock));

                        conn.Open();
                        cmd.ExecuteNonQuery();
                }
        }

        public void UpdateFruit(FruitModel fruit)
        {
                using (var conn = new OracleConnection(_connectionString))
                using (var cmd = new OracleCommand("UPDATE FruitInventory SET Type = :type, Price = :price, Stock = :stock WHERE Name = :name", conn))
                {
                        cmd.Parameters.Add(new OracleParameter("name", fruit.Name));
                        cmd.Parameters.Add(new OracleParameter("type", fruit.Type));
                        cmd.Parameters.Add(new OracleParameter("price", fruit.Price));
                        cmd.Parameters.Add(new OracleParameter("stock", fruit.Stock));

                        conn.Open();
                        cmd.ExecuteNonQuery();
                }
        }
}