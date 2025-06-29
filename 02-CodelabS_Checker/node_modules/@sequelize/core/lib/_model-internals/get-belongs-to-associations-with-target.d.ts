import { BelongsToAssociation } from '../associations/index.js';
import type { ModelStatic } from '../model.js';
/**
 * Returns all BelongsTo associations in the entire Sequelize instance that target the given model.
 *
 * @param target
 */
export declare function getBelongsToAssociationsWithTarget(target: ModelStatic): BelongsToAssociation[];
