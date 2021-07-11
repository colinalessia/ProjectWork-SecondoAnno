using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ITS.Allan.ProjectWork.Data;
using ITS.Allan.ProjectWork.Models.Entities;

namespace ITS.Allan.ProjectWork.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonsController : ControllerBase
    {
        private readonly UniBookContext _context;
        private readonly ILessonRepository _lessonsRepository;

        public LessonsController(UniBookContext context, ILessonRepository lessonRepository)
        {
            _context = context;
            _lessonsRepository = lessonRepository;
        }

        // GET: api/Lessons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lesson>>> GetLessons()
        {
            return await _context.Lessons.ToListAsync();
        }

        // GET: api/Lessons/jobs
        [HttpGet("jobs")]
        public async Task<ActionResult<IEnumerable<Lesson>>> GetLessonsJob()
        {
            var date = DateTime.Now;
            return await _context.Lessons
                .Where(l => l.StartTime.Year == date.Year && l.StartTime.Month == date.Month && l.StartTime.Day == date.Day && l.StartTime.Hour == date.Hour && l.StartTime.Minute == date.Minute)
                .OrderBy(l => l)
                .ToListAsync();
        }
        // GET: api/Lessons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Lesson>> GetLesson(int id)
        {
            var lesson = await _context.Lessons.FindAsync(id);

            if (lesson == null)
            {
                return NotFound();
            }

            return lesson;
        }

        // PUT: api/Lessons/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLesson(int id, Lesson lesson)
        {
            if (id != lesson.IdLesson)
            {
                return BadRequest();
            }

            _context.Entry(lesson).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LessonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Lessons
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Lesson>> PostLesson(Lesson lesson)
        {
            
            _context.Lessons.Add(lesson);
            await _context.SaveChangesAsync();

            await _lessonsRepository.SendCloudToDeviceMessageAsync(lesson);
            return CreatedAtAction("GetLesson", new { id = lesson.IdLesson }, lesson);
        }

        // DELETE: api/Lessons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLesson(int id)
        {
            var lesson = await _context.Lessons.FindAsync(id);
            if (lesson == null)
            {
                return NotFound();
            }

            _context.Lessons.Remove(lesson);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LessonExists(int id)
        {
            return _context.Lessons.Any(e => e.IdLesson == id);
        }
    }
}
