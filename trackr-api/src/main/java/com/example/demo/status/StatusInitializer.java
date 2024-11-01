package com.example.demo.status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Seed the status table with predefined options on startup
 */
@Component
public class StatusInitializer implements CommandLineRunner {


    @Autowired
    private StatusRepository statusRepository;

    @Override
    public void run(String... args) throws Exception {
        for(StatusOptions statusOptions : StatusOptions.values()){
            if(!statusRepository.existsByStatus(statusOptions)){
                Status status = new Status();
                status.setStatus(statusOptions);
                statusRepository.save(status);
            }
        }
    }
}
