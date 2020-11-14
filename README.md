# Reconaas
Reconaas (Reconnaissance as a service) is a tool that automates the information-gathering phase of a penetration test. Unlike classic recon tools, Reconaas was built with an analytic mindset: historically gathered data is classified and stored in a structured format that enables effective searching and diff-calculation. The tool is designed to run non-stop and asynchronously in a possibly distributed infrastructure to continuously monitor a set of targets (company/website/domain), discover their containing assets (subdomain, path, related websites, etc.) and indentify attack surfaces that are of higher interest for an offensive security engineer.
## Infrastructure design
### Recon machine (distributed)
### Diff machine (centralized)
## Safe habour
Users of Reconaas can run the recon machine against any target of their choice on their own responsibility. 
The Reconaas centralized diff machine will only support targets with a verifiable safe habour for security researchers.
## Data models
### Program
- name
- source: URL to the safe habour page
### Asset
- identifier: a unique name identifying an asset, in most cases it is the URI
- type (domain|subdomain|path|openPort)
- contentType (text/html, application/json, etc.)
- URI
- IP
- belongsTo (a program)
- technology (array) technologies being used enumerated by Wappalyzer, nmap or other tools
    + available for assets of types
- response: response status code (200, 500, etc.)
- foundBy: (tool) name of the tool that discovered the asset
- command: t
- createdAt (time of first discovery)
- updatedAt
