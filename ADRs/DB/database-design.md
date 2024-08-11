# Decision: Structuring the Database

This is a place where I can hash out how I want to design my database structure. I'm hmming and hawing because I do think I want to have static tables by entity (i.e leagues -> teams -> players), but recognize those deeply relational structure. I think that static with reference tables on top is a good design, but it is feeling a bit like overkill.

* **Issue**: I started with a simple sqlite3 database structure when getting off the ground and deploying. That being said, I now want to start to integrate the ability to initialize multiple leagues with multiple teams, full of teams. I want to reconcile the relational nature of these tables and the business rules (i.e. one team per player in league) before getting that much deeper into the app.

* **Decision**: I am going to go with a 'static' and 'ref' table approach. I think this flat structure will help with tracking those relationships early on. It might not scale super well, but it wont wont scale well?

* **Status**: Writing the initialization scripts and will seed them with sample data. I think that this will be easier to understand the shortcomings of once I click around adding players to a team in a particular league in the app.

* **Assumptions**: That I will need to reconcile with node setup as I scale horizontally. I want to structure this in a way where the player table is unaware of teams/leagues since that is data that exists outside of this app. That being said,

* **Constraints**: A business-rule constraint is the restriction of one `player` per `league-team` combination. In a way, this lends itself to a flattened table of "taken_players" which just has `(league_id, team_id, player_id)` but this feels somewhat inefficient especially when listing which players are available. Having a player table query where we filter down by `player_id not in (<taken_ids>)`.


------------------
### Additional Fields to fill out down the line

------------------

* **Positions**: List the positions (viable options or alternatives) you considered. These often require long explanations, sometimes even models and diagrams. This isn’t an exhaustive list. However, you don’t want to hear the question "Did you think about...?" during a final review; this leads to loss of credibility and questioning of other architectural decisions. This section also helps ensure that you heard others’ opinions; explicitly stating other opinions helps enroll their advocates in your decision.

* **Argument**: Outline why you selected a position, including items such as implementation cost, total ownership cost, time to market, and required development resources’ availability. This is probably as important as the decision itself.

* **Implications**: A decision comes with many implications, as the REMAP metamodel denotes. For example, a decision might introduce a need to make other decisions, create new requirements, or modify existing requirements; pose additional constraints to the environment; require renegotiating scope or schedule with customers; or require additional staff training. Clearly understanding and stating your decision’s implications can be very effective in gaining buy-in and creating a roadmap for architecture execution.

* **Related decisions**: It’s obvious that many decisions are related; you can list them here. However, we’ve found that in practice, a traceability matrix, decision trees, or metamodels are more useful. Metamodels are useful for showing complex relationships diagrammatically (such as Rose models).

* **Related requirements**: Decisions should be business driven. To show accountability, explicitly map your decisions to the objectives or requirements. You can enumerate these related requirements here, but we’ve found it more convenient to reference a traceability matrix. You can assess each architecture decision’s contribution to meeting each requirement, and then assess how well the requirement is met across all decisions. If a decision doesn’t contribute to meeting a requirement, don’t make that decision.

* **Related artifacts**: List the related architecture, design, or scope documents that this decision impacts.

* **Related principles**: If the enterprise has an agreed-upon set of principles, make sure the decision is consistent with one or more of them. This helps ensure alignment along domains or systems.

* **Notes**:  Because the decision-making process can take weeks, we’ve found it useful to capture notes and issues that the team discusses during the socialization process.