
import {type GeneratedAlways, Kysely, CamelCasePlugin} from 'kysely'
import {PostgresJSDialect} from 'kysely-postgres-js'
import {DB, kyselyIdentifierOverrides} from './schema'
import postgres from 'postgres'

// kysely's CamelCasePlugin can't recover a snake_case name that has an
// underscore directly before a digit (reminder_48h_sent -> reminder48hSent ->
// reminder48h_sent). The generated schema exports the exact spelling for such
// identifiers; everything else falls through to the default mapping.
   10	class FlootCamelCasePlugin extends CamelCasePlugin {
   11	  protected override snakeCase(str: string): string {
   12	    return kyselyIdentifierOverrides[str] ?? super.snakeCase(str)
   13	  }
   14	}
   15	
   16	export const db = new Kysely<DB>({
   17	plugins: [new FlootCamelCasePlugin()],
   18	dialect: new PostgresJSDialect({
   19	postgres: postgres(process.env.FLOOT_DATABASE_URL, {
   20	prepare: false,
   21	idle_timeout: 10,
   22	max: 3,
   23	}),
   24	}),
   25	})
