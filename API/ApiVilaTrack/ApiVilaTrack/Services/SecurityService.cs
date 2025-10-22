using System.Text.RegularExpressions;

namespace ApiVilaTrack.Services;

public class SecurityService
{
    /// <summary>
    /// Sanitiza uma string removendo caracteres potencialmente perigosos
    /// </summary>
    public static string SanitizeString(string input)
    {
        if (string.IsNullOrEmpty(input))
            return string.Empty;

        // Remove caracteres de controle e caracteres especiais perigosos
        var sanitized = Regex.Replace(input, @"[\x00-\x1F\x7F-\x9F]", "");
        
        // Remove caracteres SQL perigosos
        sanitized = Regex.Replace(sanitized, @"[';""\\]", "", RegexOptions.IgnoreCase);
        
        // Remove múltiplos espaços
        sanitized = Regex.Replace(sanitized, @"\s+", " ");
        
        return sanitized.Trim();
    }

    /// <summary>
    /// Valida se uma string contém apenas caracteres seguros
    /// </summary>
    public static bool IsSafeString(string input)
    {
        if (string.IsNullOrEmpty(input))
            return true;

        // Verifica se contém apenas caracteres alfanuméricos, espaços e alguns símbolos seguros
        return Regex.IsMatch(input, @"^[A-Za-z0-9\s._-]+$");
    }

    /// <summary>
    /// Valida se um código interno é seguro
    /// </summary>
    public static bool IsSafeInternalCode(string internalCode)
    {
        if (string.IsNullOrEmpty(internalCode))
            return false;

        // Código interno deve ter entre 1 e 50 caracteres
        if (internalCode.Length < 1 || internalCode.Length > 50)
            return false;

        // Deve conter apenas letras, números, hífen e underscore
        return Regex.IsMatch(internalCode, @"^[A-Za-z0-9_-]+$");
    }

    /// <summary>
    /// Valida se o campo Name de usuário é seguro (User.Name)
    /// </summary>
    public static bool IsSafeUserName(string name)
    {
        if (string.IsNullOrEmpty(name))
            return false;

        // Nome deve ter entre 1 e 100 caracteres
        if (name.Length < 1 || name.Length > 100)
            return false;

        // Permite apenas letras, números, espaços, pontos, hífen e underscore
        return Regex.IsMatch(name, @"^[A-Za-z0-9\s._-]+$");
    }

    /// <summary>
    /// Valida se um tipo de unidade é seguro
    /// </summary>
    public static bool IsSafeUnitType(string unitType)
    {
        if (string.IsNullOrEmpty(unitType))
            return false;

        // Tipo de unidade deve ter entre 1 e 20 caracteres
        if (unitType.Length < 1 || unitType.Length > 20)
            return false;

        // Deve conter apenas letras, números e espaços
        return Regex.IsMatch(unitType, @"^[A-Za-z0-9\s]+$");
    }

    /// <summary>
    /// Valida se um valor numérico está dentro de limites seguros
    /// </summary>
    public static bool IsSafeNumericValue(float value, float minValue = 0.01f, float maxValue = 999999.99f)
    {
        return value >= minValue && value <= maxValue;
    }

    /// <summary>
    /// Valida se uma prioridade está dentro dos limites seguros
    /// </summary>
    public static bool IsSafePriority(int priority)
    {
        return priority >= 1 && priority <= 3;
    }

    /// <summary>
    /// Valida se um status é válido
    /// </summary>
    public static bool IsValidStatus(int status)
    {
        return status >= 1 && status <= 3;
    }
}
