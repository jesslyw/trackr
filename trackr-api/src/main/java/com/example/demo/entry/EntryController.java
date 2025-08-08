package com.example.demo.entry;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/v1/entry")
@CrossOrigin(origins = "http://localhost:5173")
public class EntryController {

    private final EntryRepository entryRepository;
    private EntryService entryService;

    @Autowired
    public EntryController(EntryService entryService, EntryRepository entryRepository) {
        this.entryService = entryService;
        this.entryRepository = entryRepository;
    }

    @GetMapping
    public ResponseEntity<List<EntryDTO>> getAllEntries() {
        List<EntryDTO> entries = entryService.getAllEntries();
        return new ResponseEntity<>(entries, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> createEntry(@RequestBody @Valid Entry entry) {
        try {
            EntryDTO createdEntry = entryService.createEntry(entry);
            return new ResponseEntity<>(createdEntry, HttpStatus.CREATED);
        } catch (StatusNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateEntry(@PathVariable UUID id, @RequestBody Entry entry) {
        try {
            EntryDTO updatedEntry = entryService.updateEntry(id, entry);
            return new ResponseEntity<>(updatedEntry, HttpStatus.OK);
        } catch (EntryNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (StatusNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteEntry(@PathVariable UUID id) {
        try {
            return entryService.deleteEntry(id);
        } catch (EntryNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
