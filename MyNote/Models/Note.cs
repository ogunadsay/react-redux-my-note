using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyNote.Models
{
    public class Note
    {
        [Key]
        public int ID { get; set; }
        public string Text { get; set; }
    }
}
