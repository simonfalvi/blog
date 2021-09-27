package com.demo.blog.service;

import com.demo.blog.domain.Entry;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Entry}.
 */
public interface EntryService {
    /**
     * Save a entry.
     *
     * @param entry the entity to save.
     * @return the persisted entity.
     */
    Entry save(Entry entry);

    /**
     * Partially updates a entry.
     *
     * @param entry the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Entry> partialUpdate(Entry entry);

    /**
     * Get all the entries.
     *
     * @return the list of entities.
     */
    List<Entry> findAll();

    /**
     * Get all the entries with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Entry> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" entry.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Entry> findOne(Long id);

    /**
     * Delete the "id" entry.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
