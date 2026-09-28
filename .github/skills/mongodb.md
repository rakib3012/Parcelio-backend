# MongoDB/Mongoose Skill

Use this skill for database work.

## Rules

- Inspect the existing schema before changing it.
- Preserve existing field names unless migration is intentional.
- Use Mongoose models consistently.
- Use `.lean()` for suitable read-only queries.
- Select only needed fields for sensitive/heavy records.
- Paginate large collections.
- Avoid N+1 queries.
- Add indexes based on actual access patterns.
- Validate ObjectIds.
- Handle duplicate-key conflicts.
- Use transactions only when atomic multi-document changes require them.

## Query safety

Never directly pass arbitrary client query objects into MongoDB.

Bad:

```js
Model.find(req.query)
```

Prefer an explicitly constructed query from validated values.

## Performance

Before adding caching or complex aggregation:

1. understand the query;
2. inspect expected cardinality;
3. check indexes;
4. measure the bottleneck.
