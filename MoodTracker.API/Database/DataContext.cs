﻿using Microsoft.EntityFrameworkCore;
using MoodTracker.API.Database.Models;

namespace MoodTracker.API.Database;

public class DataContext : DbContext
{
    public DbSet<User> Users { get; set; }

    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    {
    }

    //Rules for entities
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
        base.OnModelCreating(modelBuilder);
    }

    #region ICreatedAt SaveChanges update

    private void UpdateTimestamps()
    {
        foreach (var entity in ChangeTracker.Entries().Where(p => p.State == EntityState.Added))
            if (entity.Entity is ICreatedAt created)
                created.CreatedAt = DateTime.Now;

        foreach (var entity in ChangeTracker.Entries().Where(p => p.State == EntityState.Modified))
            if (entity.Entity is IModifiedAt updated)
                updated.ModifiedAt = DateTime.Now;
    }

    public override int SaveChanges()
    {
        UpdateTimestamps();
        return base.SaveChanges();
    }

    public override int SaveChanges(bool acceptAllChangesOnSuccess)
    {
        UpdateTimestamps();
        return base.SaveChanges(acceptAllChangesOnSuccess);
    }

    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess,
        CancellationToken cancellationToken = new())
    {
        UpdateTimestamps();
        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new())
    {
        UpdateTimestamps();
        return base.SaveChangesAsync(cancellationToken);
    }

    #endregion
}