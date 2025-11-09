public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private static readonly string apiUrl = "https://api.suaempresa.com/processa-dados";

    public Worker(ILogger<Worker> logger)
    {
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var now = DateTime.Now;
            var nextRun = DateTime.Today.AddDays(1);

            var delay = nextRun - now;
            _logger.LogInformation($"Próxima execução: {nextRun}");

            await Task.Delay(delay, stoppingToken);

            await ChamarAPI();
        }
    }

    private async Task ChamarAPI()
    {
        _logger.LogInformation($"Iniciando atualização: {DateTime.Now}");

        using var client = new HttpClient();
        var response = await client.PostAsync(apiUrl, null);

        if (response.IsSuccessStatusCode)
            _logger.LogInformation("Atualização concluída com sucesso!");
        else
            _logger.LogError($"Erro na atualização: {response.StatusCode}");
    }
}