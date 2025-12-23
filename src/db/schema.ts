import { sql } from "drizzle-orm";
import { mysqlTable,  varchar, text, datetime, mysqlEnum, json } from "drizzle-orm/mysql-core";

export const eventStatus = ["DRAFT", "PUBLISHED", "CANCELED"] as const;
export type EventStatus = (typeof eventStatus)[number];

export const eventsTable = mysqlTable('public_events', {
    id: varchar("id", { length: 36 }).primaryKey(),
    title: varchar("title",{ length: 255 }).notNull(),
    description: text("description"),
    coverImageUrl: varchar("cover_image_url", { length: 512 }),
    location: varchar("location",{ length: 255 }).notNull(),
    status:mysqlEnum('status', eventStatus) .notNull().default('DRAFT'),
    metadata: json("metadata"), // flexible future use
    startDate: datetime("start_date").notNull(),
    endDate: datetime("end_date").notNull(),
    createdAt: datetime('created_at', { mode: 'date', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
    updatedAt: datetime("updated_at", { mode: "date", fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),

});

