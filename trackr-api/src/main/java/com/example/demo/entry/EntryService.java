package com.example.demo.entry;

import com.example.demo.status.Status;
import com.example.demo.status.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EntryService {
    private EntryRepository entryRepository;
    private StatusRepository statusRepository;

    @Autowired
    public EntryService(EntryRepository entryRepository, StatusRepository statusRepository) {
        this.entryRepository = entryRepository;
        this.statusRepository = statusRepository;
    }

    public List<EntryDTO> getAllEntries() {
        List<Entry> entries = entryRepository.findAll();
        return entries.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public EntryDTO createEntry(Entry entry) {
        Optional<Status> existingStatus = statusRepository.findById(entry.getStatus().getId());
        // check if status exists in database
        if (existingStatus.isEmpty()) {
            throw new StatusNotFoundException("Status " + entry.getStatus() + " not found");
        }
        entry.setStatus(existingStatus.get());
        Entry savedEntry = entryRepository.save(entry);
        return mapToDTO(savedEntry);
    }

    public EntryDTO updateEntry(UUID id, Entry entry) {
        // check if valid entry
        Optional<Entry> optionalExistingEntry = entryRepository.findById(id);
        if (optionalExistingEntry.isEmpty()) {
            throw new EntryNotFoundException("Entry "+ id +" not found");
        }
        // check if valid status
        Optional<Status> existingStatus = statusRepository.findById(entry.getStatus().getId());
        if (existingStatus.isEmpty()) {
            throw new StatusNotFoundException("Status " + entry.getStatus() + " not found");
        }
        Entry existingEntry = optionalExistingEntry.get();
        existingEntry.setName(entry.getName());
        existingEntry.setDate(entry.getDate());
        existingEntry.setNote(entry.getNote());
        existingEntry.setStatus(existingStatus.get());
        return mapToDTO(entryRepository.save(existingEntry));

    }

    public ResponseEntity<Object> deleteEntry(UUID id) {
        Optional<Entry> optionalEntry = entryRepository.findById(id);
        if (optionalEntry.isEmpty()) {
            throw new EntryNotFoundException("Entry "+ id +" not found");
        }
        entryRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // maps Entry to a DTO for API response, obscuring its lastChanged field
    private EntryDTO mapToDTO(Entry entry){
        EntryDTO dto = new EntryDTO();
        dto.setId(entry.getId());
        dto.setDate(entry.getDate());
        dto.setName(entry.getName());
        dto.setNote(entry.getNote());
        dto.setStatus(entry.getStatus());
        return dto;
    }
}
