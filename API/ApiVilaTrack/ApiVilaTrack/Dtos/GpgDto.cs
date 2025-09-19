namespace ApiVilaTrack.Dtos
{
    public class GpgDto
    {
        public string PublicKeyPath { get; set; } = string.Empty;
        public string PrivateKeyPath { get; set; } = string.Empty;
        public string PrivateKeyPassword { get; set; } = string.Empty;
    }
}