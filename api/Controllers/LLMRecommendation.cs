using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Stock;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace api.Controllers
{
    [Route("api/recommendation")]
    [ApiController]
    public class RecommendationController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public RecommendationController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpPost("gpt4-response")]
        public async Task<IActionResult> GetGPT4Response([FromBody] UserInput input)
        {
            if (string.IsNullOrEmpty(input?.Text))
            {
                return BadRequest("Input text is required.");
            }

            var apiKey = "OPENAI_API_KEY";  
            var apiUrl = "https://api.openai.com/v1/chat/completions";

            // Prepare the request payload
            var requestBody = new
            {
                model = "gpt-4o-mini", // or "gpt-4o" 
                messages = new[]
                {
                    new { role = "user", content = input.Text }
                },
                max_tokens = 1500
            };

            var jsonRequestBody = JsonConvert.SerializeObject(requestBody);

            // Prepare the HTTP request
            var request = new HttpRequestMessage(HttpMethod.Post, apiUrl);
            request.Headers.Add("Authorization", $"Bearer {apiKey}");
            request.Content = new StringContent(jsonRequestBody, Encoding.UTF8, "application/json");

            try
            {
                var response = await _httpClient.SendAsync(request);

                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
                }

                var jsonResponse = await response.Content.ReadAsStringAsync();
                return Ok(jsonResponse);
            }
            catch (HttpRequestException e)
            {
                return StatusCode(500, $"Error communicating with OpenAI API: {e.Message}");
            }
        }
    }
    public class UserInput
    {
        public string? Text { get; set; }
    }
}