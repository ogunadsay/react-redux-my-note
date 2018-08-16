using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MyNote.Models
{
    public partial class myNoteContext : DbContext
    {
        public myNoteContext()
        {
        }

        public myNoteContext(DbContextOptions<myNoteContext> options)
            : base(options)
        {
        }
        public DbSet<Note> Note { get; set; }
//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Server=.\\INSTANCE1;Database=myNote;Integrated Security=True");
//            }
//        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {}
    }
}
