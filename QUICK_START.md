# Quick Start Guide

Super simple guide to start the database viewer!

## Step 1: Start Everything

Open terminal in project folder:

```bash
docker-compose up -d
```

Wait 10-20 seconds for containers to start.

## Step 2: Open Database Viewer (GUI)

**Open your browser and go to:**

```
http://localhost:8080
```

You'll see SQLite Web (database viewer)!

**That's it! No login needed!** The database is already loaded automatically.

**Now you can see:**
- ✅ All your tables (notes, vitals)
- ✅ All data in nice tables
- ✅ Run SQL queries
- ✅ See graphs/charts of data
- ✅ Export data as CSV/JSON

## Step 3: Check What's Running

```bash
docker ps
```

You should see:
- `eldercare-db-viewer` (port 8080) ← Database GUI
- `eldercare-ollama` (port 11434) ← AI model
- `eldercare-backend` (port 3000) ← API (when you build it)

## Using the Database Viewer

### View All Patient Notes:

1. Click on `notes` table
2. See all SOAP notes!

### View Vitals:

1. Click on `vitals` table
2. See blood pressure, temperature, heart rate

### Run Custom Queries:

1. Click "SQL command" at top
2. Try this:

```sql
SELECT
    n.id,
    n.S_text,
    v.systolic_mmHg,
    v.temperature_c
FROM notes n
LEFT JOIN vitals v ON n.id = v.note_id;
```

3. Click "Execute"
4. See results!

### Export Data:

1. Select table
2. Click "Export"
3. Choose format (CSV, SQL, etc.)
4. Download!

## Stop Everything

```bash
docker-compose down
```

## Restart Everything

```bash
docker-compose restart
```

## Troubleshooting

**Can't connect to http://localhost:8080?**
- Wait 20 more seconds
- Check if running: `docker ps`
- Restart: `docker-compose restart db-viewer`

**Database viewer shows empty?**
- Check file exists: `ls database/eldercare_dev.db`
- Restart viewer: `docker-compose restart db-viewer`

**Port 8080 already in use?**
Edit `docker-compose.yml` and change `8080:8080` to `8081:8080`, then use `http://localhost:8081`

## What Your Team Sees

**Everyone who runs `docker-compose up` gets:**
- ✅ Same database viewer at http://localhost:8080
- ✅ Same data (if using shared setup script)
- ✅ Same tools

Perfect for demos and teamwork!

---

**Next:** Check `DOCKER_SETUP.md` for full Docker guide
