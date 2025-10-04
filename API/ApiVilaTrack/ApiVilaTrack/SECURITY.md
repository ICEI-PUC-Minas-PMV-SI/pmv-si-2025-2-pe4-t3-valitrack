# 🛡️ Medidas de Segurança - ValiTrack API

## Proteção Contra SQL Injection

### ✅ **Proteções Implementadas**

#### 1. **Entity Framework Core (Proteção Principal)**
- **Parameterized Queries**: Todas as consultas usam parâmetros, não concatenação de strings
- **ORM Nativo**: EF Core automaticamente protege contra SQL Injection
- **Type Safety**: Tipos fortes impedem injeção de código malicioso

#### 2. **Validação de Entrada (Data Annotations)**
```csharp
[Required(ErrorMessage = "Código interno é obrigatório")]
[StringLength(50, ErrorMessage = "Código interno deve ter no máximo 50 caracteres")]
[RegularExpression(@"^[A-Za-z0-9_-]+$", ErrorMessage = "Código interno deve conter apenas letras, números, hífen e underscore")]
string InternalCode
```

#### 3. **Sanitização de Dados**
```csharp
// Remove caracteres perigosos
var sanitized = Regex.Replace(input, @"[\x00-\x1F\x7F-\x9F]", "");
sanitized = Regex.Replace(sanitized, @"[';""\\]", "", RegexOptions.IgnoreCase);
```

#### 4. **Validação de Segurança**
```csharp
// Validação de códigos internos
public static bool IsSafeInternalCode(string internalCode)
{
    return Regex.IsMatch(internalCode, @"^[A-Za-z0-9_-]+$");
}
```

#### 5. **Middleware de Segurança**
- **Detecção de Padrões Suspeitos**: Bloqueia requisições com padrões de SQL Injection
- **Logging de Segurança**: Registra tentativas de ataque
- **Bloqueio Automático**: Retorna erro 400 para requisições suspeitas

### 🔒 **Camadas de Proteção**

#### **Camada 1: Middleware de Segurança**
- Intercepta requisições antes de chegarem aos controllers
- Detecta padrões suspeitos como `' OR 1=1`, `DROP TABLE`, etc.
- Bloqueia automaticamente tentativas de ataque

#### **Camada 2: Validação de Modelo**
- Data Annotations nos DTOs
- Validação automática pelo ASP.NET Core
- Mensagens de erro personalizadas

#### **Camada 3: Validação de Controller**
- Validações adicionais nos endpoints
- Verificação de tipos e limites
- Tratamento de exceções

#### **Camada 4: Sanitização no Repository**
- Limpeza de dados antes de salvar
- Validação de caracteres seguros
- Verificação de limites de valores

#### **Camada 5: Entity Framework Core**
- Parameterized queries automáticas
- Proteção nativa contra SQL Injection
- Type safety garantida

### 🚨 **Padrões Bloqueados**

O middleware detecta e bloqueia:
- `' OR 1=1`
- `DROP TABLE`
- `DELETE FROM`
- `INSERT INTO`
- `UPDATE SET`
- `UNION SELECT`
- `'; --`
- `/* */`
- `xp_`, `sp_`
- `exec(`, `execute(`
- Scripts maliciosos

### 📊 **Exemplos de Proteção**

#### **Entrada Maliciosa:**
```json
{
  "internalCode": "PROD001'; DROP TABLE StockProducts; --",
  "unitType": "kg",
  "originalPrice": 15.99
}
```

#### **Resposta da API:**
```json
{
  "error": "Código interno inválido ou contém caracteres perigosos"
}
```

### 🔍 **Monitoramento**

#### **Logs de Segurança:**
```
[Warning] Tentativa de ataque detectada de 192.168.1.100: /stock-products/by-code/PROD001'; DROP TABLE StockProducts; --
```

#### **Métricas:**
- Tentativas de ataque bloqueadas
- Requisições suspeitas
- Padrões de ataque detectados

### 🛠️ **Configurações Recomendadas**

#### **Connection String Segura:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=server;Database=db;User Id=user;Password=password;Encrypt=true;TrustServerCertificate=false;"
  }
}
```

#### **Headers de Segurança:**
```csharp
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Add("X-Frame-Options", "DENY");
    context.Response.Headers.Add("X-XSS-Protection", "1; mode=block");
    await next();
});
```

### ✅ **Checklist de Segurança**

- [x] Entity Framework Core com parameterized queries
- [x] Validação de entrada com Data Annotations
- [x] Sanitização de strings
- [x] Validação de tipos e limites
- [x] Middleware de detecção de ataques
- [x] Logging de segurança
- [x] Bloqueio automático de requisições suspeitas
- [x] Headers de segurança
- [x] Connection string criptografada
- [x] Tratamento de exceções

### 🚀 **Próximos Passos**

1. **Rate Limiting**: Implementar limite de requisições por IP
2. **Autenticação JWT**: Adicionar tokens de autenticação
3. **HTTPS Obrigatório**: Forçar conexões seguras
4. **Auditoria**: Log detalhado de todas as operações
5. **Backup Seguro**: Criptografia de backups do banco

### 📞 **Suporte**

Para dúvidas sobre segurança, consulte:
- Documentação do Entity Framework Core
- OWASP Top 10
- Microsoft Security Best Practices
