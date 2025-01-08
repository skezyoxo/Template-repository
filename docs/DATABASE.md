# Database Documentation

## Overview

This document provides detailed information about the database schema, relationships, and design decisions for the Second Brain application. The application uses PostgreSQL as the database and Prisma as the ORM.

## Schema Design

### Users Table

Stores user account information and authentication details.

| Column        | Type     | Constraints      | Description                    |
| ------------- | -------- | ---------------- | ------------------------------ |
| id            | UUID     | PK, Default uuid | Unique identifier for the user |
| email         | String   | Unique, Not Null | User's email address           |
| password_hash | String   | Not Null         | Bcrypt hashed password         |
| time_zone     | String   | Nullable         | User's preferred timezone      |
| role_id       | Integer  | FK, Not Null     | Reference to Roles table       |
| created_at    | DateTime | Default now()    | Timestamp of user creation     |
| updated_at    | DateTime | Default now()    | Timestamp of last update       |

**Indexes:**

- Primary Key: `id`
- Unique Index: `email`
- Foreign Key: `role_id` references `Roles(id)`

### Roles Table

Defines user roles for role-based access control.

| Column     | Type     | Constraints       | Description                      |
| ---------- | -------- | ----------------- | -------------------------------- |
| id         | Integer  | PK, AutoIncrement | Unique identifier for the role   |
| name       | String   | Not Null          | Name of the role (e.g., "admin") |
| created_at | DateTime | Default now()     | Timestamp of role creation       |
| updated_at | DateTime | Default now()     | Timestamp of last update         |

**Indexes:**

- Primary Key: `id`

### Permissions Table

Defines individual permissions that can be assigned to roles.

| Column | Type    | Constraints       | Description                          |
| ------ | ------- | ----------------- | ------------------------------------ |
| id     | Integer | PK, AutoIncrement | Unique identifier for the permission |
| name   | String  | Not Null          | Name of the permission               |

**Indexes:**

- Primary Key: `id`

### RolePermissions Table

Junction table implementing many-to-many relationship between Roles and Permissions.

| Column        | Type    | Constraints | Description                    |
| ------------- | ------- | ----------- | ------------------------------ |
| role_id       | Integer | PK, FK      | Reference to Roles table       |
| permission_id | Integer | PK, FK      | Reference to Permissions table |

**Indexes:**

- Composite Primary Key: `(role_id, permission_id)`
- Foreign Keys:
  - `role_id` references `Roles(id)`
  - `permission_id` references `Permissions(id)`

## Relationships

### User -> Role (Many-to-One)

- Each user has exactly one role
- Each role can be assigned to multiple users
- Relationship enforced by foreign key `Users.role_id`

### Role -> Permission (Many-to-Many)

- Each role can have multiple permissions
- Each permission can be assigned to multiple roles
- Relationship implemented through `RolePermissions` junction table

## Design Decisions

### UUID for User IDs

- Using UUID instead of sequential integers for user IDs
- Provides better security (non-guessable IDs)
- Allows for distributed ID generation
- Helps with data migration and replication

### Timestamps

- All major tables include `created_at` and `updated_at`
- Automatically managed by Prisma
- Helps with auditing and debugging

### Role-Based Access Control (RBAC)

- Implemented using Roles and Permissions tables
- Flexible permission system through many-to-many relationship
- Allows for fine-grained access control
- Easy to extend with new roles and permissions

### Timezone Handling

- User timezone stored as string
- Follows IANA timezone database format (e.g., "America/New_York")
- Allows for proper datetime handling across different regions

## Database Migrations

Migrations are handled through Prisma and are version controlled. To apply migrations:

```bash
# Generate a new migration
npx prisma migrate dev --name description_of_changes

# Apply migrations in production
npx prisma migrate deploy
```

## Backup and Recovery

### Backup Strategy

1. Regular automated backups of the entire database
2. Point-in-time recovery capability
3. Backup before major migrations

### Recovery Process

1. Restore from latest backup
2. Apply transaction logs if needed
3. Verify data integrity
4. Update connection strings if necessary

## Performance Considerations

### Indexes

- Primary keys on all tables
- Foreign key indexes for relationships
- Unique index on user email

### Constraints

- Referential integrity through foreign keys
- Unique constraints where appropriate
- Not null constraints on required fields

## Future Considerations

1. **Soft Deletes**

   - Consider adding `deleted_at` timestamp
   - Implement soft delete functionality

2. **Audit Logging**

   - Consider adding audit tables
   - Track changes to sensitive data

3. **Data Archival**

   - Plan for archiving old/inactive records
   - Consider partitioning strategies

4. **Scaling**
   - Monitor table growth
   - Plan for potential sharding
   - Consider read replicas
