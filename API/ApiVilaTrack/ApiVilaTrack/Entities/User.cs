namespace ApiVilaTrack.Entities;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Senha { get; set; } = string.Empty;

    public User(int id, string name, string senha)
    {
        Id = id;
        Name = name;
        Senha = senha;
    }
}
