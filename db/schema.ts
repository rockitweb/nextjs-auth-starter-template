import { table } from "console";
import { relations } from "drizzle-orm";
import {
  integer,
  text,
  pgTable,
  uuid,
  index,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { title } from "process";

const tableDefaults = {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: "date", precision: 3 })
    .notNull()
    .$onUpdate(() => new Date()),
};

export const websites = pgTable(
  "websites",
  {
    ...tableDefaults,
    url: text().notNull(),
    title: text().notNull(),
    organisationId: text().notNull(),
  },
  (table) => {
    return { orgIdx: index("organisation_idx").on(table.organisationId) };
  }
);

export const websiteRelations = relations(websites, ({ many }) => ({
  websitePages: many(websitePages),
  audits: many(audits),
}));

export const websitePages = pgTable("websitePages", {
  ...tableDefaults,
  websiteId: uuid()
    .notNull()
    .references(() => websites.id),
  path: text().notNull(),
});

export const websitePageRelations = relations(
  websitePages,
  ({ one, many }) => ({
    website: one(websites, {
      fields: [websitePages.websiteId],
      references: [websites.id],
    }),
    auditPages: many(auditPages),
  })
);

export const audits = pgTable(
  "audits",
  {
    ...tableDefaults,
    url: varchar({ length: 256 }),
    title: varchar({ length: 256 }),
    websiteId: uuid().references(() => websites.id),
    status: varchar({ length: 256 }),
  },
  (table) => {
    return { websiteIdx: index("website_idx").on(table.websiteId) };
  }
);

export const auditRelations = relations(audits, ({ one, many }) => ({
  website: one(websites, {
    fields: [audits.websiteId],
    references: [websites.id],
  }),
  auditPages: many(auditPages),
}));

export const auditPages = pgTable(
  "auditPages",
  {
    ...tableDefaults,
    auditId: uuid()
      .notNull()
      .references(() => audits.id),
    websitePageId: uuid().references(() => websitePages.id),
    status: varchar({ length: 256 }),
    path: varchar({ length: 256 }),
    errorCount: integer(),
    warningCount: integer(),
    noticeCount: integer(),
    accessScore: integer(),
  },
  (table) => {
    return {
      auditIdx: index("audit_idx").on(table.auditId),
      websitePageIdx: index("websitePage_idx").on(table.websitePageId),
    };
  }
);

export const auditPageRelations = relations(auditPages, ({ one, many }) => ({
  audit: one(audits, {
    fields: [auditPages.auditId],
    references: [audits.id],
  }),
  websitePage: one(websitePages, {
    fields: [auditPages.websitePageId],
    references: [websitePages.id],
  }),
  issues: many(issues),
}));

export const issues = pgTable("issues", {
  ...tableDefaults,
  auditPageId: uuid()
    .notNull()
    .references(() => auditPages.id),
  type: varchar({ length: 256 }),
  status: varchar({ length: 256 }),
  context: varchar({ length: 256 }),
  code: varchar({ length: 256 }),
  typeCode: varchar({ length: 256 }),
  runner: varchar({ length: 256 }),
  recurence: integer(),
  selector: varchar({ length: 256 }),
  clip: text(),
  clipBase64: text(),
  recommendations: text(),
  wcagSectionReference: varchar({ length: 256 }),
  wcagSectionTitle: varchar({ length: 256 }),
  wcagSectionUrl: varchar({ length: 256 }),
  wcagSectionDescription: varchar({ length: 256 }),
  wcagGuidelineReference: varchar({ length: 256 }),
  wcagGuidelineTitle: varchar({ length: 256 }),
  wcagGuidelineUrl: varchar({ length: 256 }),
  wcagGuidelineDescription: varchar({ length: 256 }),
  wcagSuccessCriterionReference: varchar({ length: 256 }),
  wcagSuccessCriterionTitle: varchar({ length: 256 }),
  wcagSuccessCriterionUrl: varchar({ length: 256 }),
  wcagSuccessCriterionDescription: varchar({ length: 256 }),
  severity: varchar({ length: 256 }),
  wcagLevel: varchar({ length: 256 }),
  score: varchar({ length: 256 }),
});

export const issueRelations = relations(issues, ({ one }) => ({
  auditPage: one(auditPages, {
    fields: [issues.auditPageId],
    references: [auditPages.id],
  }),
}));
