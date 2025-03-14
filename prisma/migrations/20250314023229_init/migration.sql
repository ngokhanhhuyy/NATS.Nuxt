-- CreateTable
CREATE TABLE "about_us_introductions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "main_quote_content" TEXT NOT NULL,
    "about_us_content" TEXT NOT NULL,
    "why_choose_us" TEXT NOT NULL,
    "our_difference_content" TEXT NOT NULL,
    "our_culture_content" TEXT NOT NULL,
    "thumbnail_id" INTEGER,
    CONSTRAINT "about_us_introductions_thumbnail_id_fkey" FOREIGN KEY ("thumbnail_id") REFERENCES "photos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "catalog_items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "summary" TEXT,
    "detail" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "catalog_item_photos" (
    "catalog_item_id" INTEGER NOT NULL,
    "photo_id" INTEGER NOT NULL,
    CONSTRAINT "catalog_item_photos_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "photos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "certificates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "photoId" INTEGER NOT NULL,
    CONSTRAINT "certificates_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "photos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "enquiries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "full_name" TEXT NOT NULL,
    "email" TEXT,
    "phone_number" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "received_datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_completed" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "general_settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "application_name" TEXT NOT NULL,
    "application_short_name" TEXT NOT NULL,
    "is_under_maintainance" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "members" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "full_name" TEXT NOT NULL,
    "role_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail_id" INTEGER NOT NULL,
    CONSTRAINT "members_thumbnail_id_fkey" FOREIGN KEY ("thumbnail_id") REFERENCES "photos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "posts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "normalized_title" TEXT NOT NULL,
    "thumbnail_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_datetime" DATETIME,
    "is_pinned" BOOLEAN NOT NULL DEFAULT false,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "user_id" INTEGER,
    CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "slider_items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "thumbnail_id" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    CONSTRAINT "slider_items_thumbnail_id_fkey" FOREIGN KEY ("thumbnail_id") REFERENCES "photos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "summary_items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "summary_content" TEXT,
    "detail_content" TEXT NOT NULL,
    "thumbnail_id" INTEGER NOT NULL,
    CONSTRAINT "summary_items_thumbnail_id_fkey" FOREIGN KEY ("thumbnail_id") REFERENCES "photos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "traffic_by_dates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recorded_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "access_count" INTEGER NOT NULL,
    "guest_count" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "traffic_by_hours" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recorded_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "access_count" INTEGER NOT NULL,
    "guest_count" INTEGER NOT NULL,
    "date_id" INTEGER NOT NULL,
    CONSTRAINT "traffic_by_hours_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "traffic_by_dates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "traffic_by_ip_addresses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ip_address" TEXT NOT NULL,
    "access_count" INTEGER NOT NULL DEFAULT 0,
    "last_access_datetime" DATETIME NOT NULL,
    "last_user_agent" TEXT NOT NULL,
    "hour_id" INTEGER NOT NULL,
    CONSTRAINT "traffic_by_ip_addresses_hour_id_fkey" FOREIGN KEY ("hour_id") REFERENCES "traffic_by_hours" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "photos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" BLOB NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "about_us_introductions_thumbnail_id_key" ON "about_us_introductions"("thumbnail_id");

-- CreateIndex
CREATE UNIQUE INDEX "catalog_item_photos_photo_id_key" ON "catalog_item_photos"("photo_id");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_photoId_key" ON "certificates"("photoId");

-- CreateIndex
CREATE UNIQUE INDEX "members_thumbnail_id_key" ON "members"("thumbnail_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_normalized_title_key" ON "posts"("normalized_title");

-- CreateIndex
CREATE UNIQUE INDEX "posts_thumbnail_id_key" ON "posts"("thumbnail_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_user_id_key" ON "posts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "summary_items_thumbnail_id_key" ON "summary_items"("thumbnail_id");
