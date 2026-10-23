<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Business facts (phone, address, socials) live only in src/lib/site.ts so name/address/phone stay identical site-wide for Google Business ranking.
- Product data is generated from the owner's catalogue workbook into src/data/products.json; product photos sit in public/catalogue named by SKU.
- Enquiry forms currently deliver via pre-filled WhatsApp messages (no backend yet).
