package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.dto.request.ToyRequest;
import com.victorpolicarpo.toyloop.dto.response.ToyResponse;
import com.victorpolicarpo.toyloop.dto.update.ToyUpdate;
import com.victorpolicarpo.toyloop.entity.Toy;
import com.victorpolicarpo.toyloop.exception.BusinessRuleException;
import com.victorpolicarpo.toyloop.exception.ResourceAlreadyExistsException;
import com.victorpolicarpo.toyloop.exception.ResourceNotFoundException;
import com.victorpolicarpo.toyloop.mapper.ToyMapper;
import com.victorpolicarpo.toyloop.repository.ToyRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ToyService {
    private final ToyRepository toyRepository;
    private final ToyMapper toyMapper;

    @Transactional
    public void createToy(ToyRequest dto) {
        if (toyRepository.existsByNameAndActiveTrue(dto.name())){
            throw new ResourceAlreadyExistsException("A toy with this name already exists.");
        }
        Toy toy = toyMapper.toEntity(dto);
        toyRepository.save(toy);
    }

    public Page<ToyResponse> listAllToys(LocalDateTime start, LocalDateTime end, Long excludePartyId, Pageable pageable) {
        LocalDateTime targetEnd = (end == null && start != null) ? start.plusHours(4) : end;
        if (start == null){
            return toyRepository.findByActiveTrue(pageable).map(toy -> new ToyResponse(
                    toy.getToyId(),
                    toy.getName(),
                    toy.getValueForFourHours(),
                    toy.getAvailableQuantity()
            ));
        }
        Long partyIdToExclude = (excludePartyId != null) ? excludePartyId : -1L;
        return toyRepository.findAvailableToys(start, targetEnd, partyIdToExclude, pageable);
    }

    @Transactional
    public void updateToy(ToyUpdate dto, Long id) {
        Toy toy = findById(id);
        if (!toy.isActive()){
            throw new BusinessRuleException("Toy is inactive and cannot be updated.");
        }
        toyMapper.updateEntityFromDto(dto, toy);
        toyRepository.save(toy);
    }

    @Transactional
    public void delete(Long id) {
        Toy toy = findById(id);
        toy.setActive(false);
    }

    public ToyResponse findToyById(Long id) {
        Toy toy = findById(id);
        if (!toy.isActive()) {
            throw new ResourceNotFoundException("A toy Id not found or not exist.");
        }
        return toyMapper.toResponse(toy);
    }

    public Toy findById(Long id){
        return toyRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("A toy Id not found or not exist.")
        );
    }
}
