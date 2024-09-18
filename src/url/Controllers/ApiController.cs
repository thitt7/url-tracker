/* resolve build errors before uncommenting, there is some missing namespace or package reference */

// using AutoMapper;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using URLService.Data;
// using URLService.DTOs;
// using URLService.Entities;
// using URLService.Services;

// namespace URLService.Controllers;

// [Route("api")]
// public class ApiController : Controller
// {
//     [HttpGet("private")]
//     [Authorize]
//     public IActionResult Private()
//     {
//         return Ok(new
//         {
//             Message = "Hello from a private endpoint!"
//         });
//     }

//     [HttpGet("private-scoped")]
//     [Authorize("read:messages")]
//     public IActionResult Scoped()
//     {
//         return Ok(new
//         {
//             Message = "Hello from a private-scoped endpoint!"
//         });
//     }
// }