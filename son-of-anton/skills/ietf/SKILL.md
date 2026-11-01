---
name: ietf
description: Find and read RFCs, Internet-Drafts, and working-group material in IETF Datatracker. Use for standards research, RFC or draft lookups, protocol requirements, document status, and revision history.
license: MIT
---

# IETF Datatracker

Use [Datatracker](https://datatracker.ietf.org/) to find documents and establish
their status, then read the specification itself. Public research needs no
account or dedicated MCP server; use the available browser, search, or HTTP tools.

## Find the document

- For an identifier, open its record directly: `/doc/rfc9457/` or
  `/doc/draft-ietf-oauth-v2-1/` on `https://datatracker.ietf.org`.
- Otherwise use [document search](https://datatracker.ietf.org/doc/search) by
  name, title, or RFC number. Narrow by document type, working group, author,
  stream, or state. Include expired, replaced, and withdrawn drafts for history.
- For a phrase inside a specification, try a web search such as
  `site:datatracker.ietf.org/doc/html/ "problem details"`. The document search
  field searches metadata; do not assume it searches the document body. Open
  the actual document before using a result as evidence.
- Follow the record's working-group link for its charter, documents, and meeting
  materials. Follow replacement links when a draft has changed names.

## Establish status and version

Read the record and the document's header and status section before calling it
a standard or recommending an implementation:

- Record the RFC's category, stream, and current status. An RFC can be
  Informational, Experimental, or Historic; publication alone does not make it
  an Internet Standard. Standards Track also has maturity levels.
- Follow **Obsoleted by**, **Updated by**, and related links. An update can amend
  only part of an RFC; read the relevant changes alongside the original.
- For an Internet-Draft, check revision, date, expiry, and whether it is active,
  replaced, or published as an RFC. A draft is work in progress. Its intended
  status and “Obsoletes ... (if approved)” do not establish a published standard.
- Respect a requested historical version. Explain relevant successors without
  silently substituting them. Use the version selector and comparison view
  when the question concerns changes between revisions.
- Distinguish publication dates from Datatracker metadata's **Last updated**.
  A metadata change does not imply revised RFC text.

## Read the requirements

1. Open the linked HTML or text; prefer HTML for navigation and section links.
   Use the table of contents and search within the document to locate the rule.
2. Read its surrounding definitions, conditions, exceptions, and applicable
   normative references. Check security considerations when assessing safety.
3. Interpret MUST, SHOULD, and MAY using that document's requirements-language
   section. Preserve their strength and scope; distinguish requirements from
   examples, recommendations, and your own implementation advice.
4. Follow the RFC Editor **Errata** link. State whether a relevant correction is
   Verified, Reported, Held for Document Update, or Rejected; do not treat every
   submission as an accepted correction.
5. For rationale, use the History tab, reviews, working-group minutes, and
   linked mailing-list discussions. Attribute claims to their authors and dates;
   discussion and individual proposals do not override published requirements.

## Cite what was checked

Answer the question first. Identify the document and relevant status or draft
revision, then link directly to the sections supporting the answer. For example:

- RFC section: `https://datatracker.ietf.org/doc/html/rfc9457#section-3`
- Pinned draft: `https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-17`
  (an example revision, not a claim about the latest one). Append the section
  anchor found in that revision; headings and numbering can change.

When answering “current” or “latest”, check the live record and give the date
checked. Separate specification requirements, implementation behavior, and
inferences. State any source or status you could not verify.

## Optional metadata API

Use the [read-only framework API](https://datatracker.ietf.org/api/) for structured
lookups. These GET examples return one document or an exact-name search:

```text
https://datatracker.ietf.org/api/v1/doc/document/rfc9457/?format=json
https://datatracker.ietf.org/api/v1/doc/document/?name=rfc9457&format=json&limit=1
```

Search responses contain `objects` and pagination metadata; follow `meta.next`
only as far as needed. Consult the API notes before adding filters. Documents
have several independent state types, so resolve linked state resources rather
than guessing numeric IDs or treating one state as the entire publication status.
Use the linked HTML or text for requirements; API metadata is not the document.
