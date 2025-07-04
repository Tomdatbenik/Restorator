import { MapTuple, MapFromTuple, MapToTuple } from "../interfaces/mapTuple.interface";
import { MapItem } from "../interfaces/mapItem.interface";
import { Model } from "../classes/model.base";

export type UnifiedMappingDirection = 'mapTo' | 'mapFrom';

export interface UnifiedMappingOptions<T, Y> {
  source: any;
  mapping?: MapTuple<T, Y> | MapToTuple<T> | MapFromTuple<Y> | MapItem[];
  targetType?: { new (...args: any[]): Y };
  direction?: UnifiedMappingDirection;
  args?: any[];
  excludeProperties?: string[];
}

/**
 * Unified mapping function that handles both mapTo and mapFrom operations
 * @param options - Configuration options for the mapping
 * @returns The mapped result
 */
export function unifiedMapping<T, Y>(options: UnifiedMappingOptions<T, Y>): Y | T {
  const { source, mapping, targetType, direction = 'mapTo', args = [], excludeProperties = [] } = options;
  
  // Initialize the target object
  let target: any;
  
  if (targetType) {
    if (args.length > 0) {
      target = new targetType(...args);
    } else {
      target = new targetType();
    }
  } else {
    target = direction === 'mapTo' ? new Model() : {};
  }

  // Convert mapping to a consistent format (MapItem[])
  let mappingItems: MapItem[] = [];
  let hasExplicitMapping = false;
  
  if (mapping && Array.isArray(mapping) && mapping.length > 0) {
    if (Array.isArray(mapping[0])) {
      // Handle tuple mappings
      mappingItems = (mapping as any[]).map(([sourceKey, targetKey]) => ({
        source: String(sourceKey),
        target: String(targetKey)
      }));
      hasExplicitMapping = true;
    } else {
      // Handle MapItem[] directly
      mappingItems = mapping as MapItem[];
    }
  }

  // For mapTo operations without explicit mappings, first copy all non-excluded properties
  // For mapFrom operations, copy all properties from source that aren't being mapped
  if (direction === 'mapTo' && source instanceof Model && !hasExplicitMapping) {
    Object.keys(source).forEach((property) => {
      if (!excludeProperties.includes(property)) {
        if ((source as any)[property] instanceof Model) {
          (target as any)[property] = (source as any)[property].parse();
        } else {
          (target as any)[property] = (source as any)[property];
        }
      }
    });
  } else if (direction === 'mapFrom' && !hasExplicitMapping) {
    // For mapFrom, copy properties that aren't being mapped
    const mappedSources = new Set(mappingItems.map(item => item.source));
    Object.keys(source).forEach((property) => {
      if (!mappedSources.has(property) && !excludeProperties.includes(property)) {
        if (source[property] && typeof source[property] === 'object' && !Array.isArray(source[property])) {
          // Handle nested objects - try to create a Model instance
          if (target[property] instanceof Model) {
            (target as any)[property] = (target[property] as Model).fromJson(JSON.stringify(source[property]));
          } else {
            (target as any)[property] = source[property];
          }
        } else {
          (target as any)[property] = source[property];
        }
      }
    });
  }

  // If no mapping items, return the target as-is
  if (mappingItems.length === 0) {
    return target;
  }

  // Apply the mapping (reverse order to match original behavior for mapTo)
  const itemsToProcess = direction === 'mapTo' ? mappingItems.slice().reverse() : mappingItems;
  
  itemsToProcess.forEach((item) => {
    const sourceValue = source[item.source];
    
    if (sourceValue instanceof Model) {
      // Recursively parse nested models
      target[item.target] = sourceValue.parse();
    } else if (direction === 'mapFrom' && sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
      // For mapFrom, handle nested objects
      if (target[item.target] instanceof Model) {
        (target as any)[item.target] = (target[item.target] as Model).fromJson(JSON.stringify(sourceValue));
      } else {
        (target as any)[item.target] = sourceValue;
      }
    } else {
      // Direct value assignment
      target[item.target] = sourceValue;
    }

    // Remove the source property if it exists in the target (only for mapTo and not explicit mappings)
    if (direction === 'mapTo' && !hasExplicitMapping && target[item.source] !== undefined) {
      delete target[item.source];
    }
  });

  return target as Y;
}