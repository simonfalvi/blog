package com.demo.blog.service.impl;

import com.demo.blog.domain.Entry;
import com.demo.blog.repository.EntryRepository;
import com.demo.blog.service.EntryService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Entry}.
 */
@Service
@Transactional
public class EntryServiceImpl implements EntryService {

    private final Logger log = LoggerFactory.getLogger(EntryServiceImpl.class);

    private final EntryRepository entryRepository;

    public EntryServiceImpl(EntryRepository entryRepository) {
        this.entryRepository = entryRepository;
    }

    @Override
    public Entry save(Entry entry) {
        log.debug("Request to save Entry : {}", entry);
        return entryRepository.save(entry);
    }

    @Override
    public Optional<Entry> partialUpdate(Entry entry) {
        log.debug("Request to partially update Entry : {}", entry);

        return entryRepository
            .findById(entry.getId())
            .map(existingEntry -> {
                if (entry.getTitle() != null) {
                    existingEntry.setTitle(entry.getTitle());
                }
                if (entry.getContent() != null) {
                    existingEntry.setContent(entry.getContent());
                }
                if (entry.getDate() != null) {
                    existingEntry.setDate(entry.getDate());
                }

                return existingEntry;
            })
            .map(entryRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Entry> findAll() {
        log.debug("Request to get all Entries");
        return entryRepository.findAllWithEagerRelationships();
    }

    public Page<Entry> findAllWithEagerRelationships(Pageable pageable) {
        return entryRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Entry> findOne(Long id) {
        log.debug("Request to get Entry : {}", id);
        return entryRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Entry : {}", id);
        entryRepository.deleteById(id);
    }
}
