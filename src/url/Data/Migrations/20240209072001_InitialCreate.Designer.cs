﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using URLService.Data;

#nullable disable

namespace url.Data.Migrations
{
    [DbContext(typeof(UrlDbContext))]
    [Migration("20240209072001_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("URLService.Entities.URL", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("OriginalURL")
                        .HasColumnType("longtext");

                    b.Property<string>("TrackingId")
                        .HasColumnType("longtext");

                    b.Property<string>("TrackingURL")
                        .HasColumnType("longtext");

                    b.Property<Guid>("URLId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.ToTable("URLs");
                });

            modelBuilder.Entity("URLService.Entities.VisitLog", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("City")
                        .HasColumnType("longtext");

                    b.Property<string>("Continent")
                        .HasColumnType("longtext");

                    b.Property<string>("Coordinates")
                        .HasColumnType("longtext");

                    b.Property<string>("Country")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("IPAddress")
                        .HasColumnType("longtext");

                    b.Property<string>("ISP")
                        .HasColumnType("longtext");

                    b.Property<string>("Org")
                        .HasColumnType("longtext");

                    b.Property<string>("Region")
                        .HasColumnType("longtext");

                    b.Property<Guid?>("URLId")
                        .HasColumnType("char(36)");

                    b.Property<string>("UserAgent")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("URLId");

                    b.ToTable("VisitLogs");
                });

            modelBuilder.Entity("URLService.Entities.VisitLog", b =>
                {
                    b.HasOne("URLService.Entities.URL", "URL")
                        .WithMany("VisitLogs")
                        .HasForeignKey("URLId");

                    b.Navigation("URL");
                });

            modelBuilder.Entity("URLService.Entities.URL", b =>
                {
                    b.Navigation("VisitLogs");
                });
#pragma warning restore 612, 618
        }
    }
}