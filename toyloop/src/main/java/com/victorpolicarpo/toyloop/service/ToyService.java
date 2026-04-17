package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.dto.request.ToyRequest;
import com.victorpolicarpo.toyloop.dto.response.ToyResponse;
import com.victorpolicarpo.toyloop.dto.update.ToyUpdate;
import com.victorpolicarpo.toyloop.entity.Toy;
import com.victorpolicarpo.toyloop.exception.ResourceNotFoundException;
import com.victorpolicarpo.toyloop.exception.ResourceAlreadyExistsException;
import com.victorpolicarpo.toyloop.mapper.ToyMapper;
import com.victorpolicarpo.toyloop.repository.PartyToyRepository;
import com.victorpolicarpo.toyloop.repository.ToyRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ToyService {
    private final ToyRepository toyRepository;
    private final ToyMapper toyMapper;
    private final PartyToyRepository partyToyRepository;

    public void createToy(@Valid ToyRequest dto) {
        if (toyRepository.existsByName(dto.name())){
            throw new ResourceAlreadyExistsException("A toy with this name already exists.");
        }
        Toy toy = toyMapper.toEntity(dto);
        toyRepository.save(toy);
    }

    public Page<ToyResponse> listAllToys(LocalDateTime start, LocalDateTime end, Pageable pageable) {
        List<Toy> allToys = toyRepository.findAll();

        Map<Long, Integer> busyMap = (start == null || end == null)
                ? Collections.emptyMap()
                : partyToyRepository.findAllOccupiedQuantities(start, end)
                .stream()
                .collect(Collectors.toMap(
                        PartyToyRepository.ToyOccupationProjection::getToyId,
                        PartyToyRepository.ToyOccupationProjection::getOccupiedQty
                ));

        List<ToyResponse> allResponses = allToys.stream()
                .map(toy -> {
                    Integer occupied = busyMap.getOrDefault(toy.getToyId(), 0);
                    int available = Math.max(0, toy.getAvailableQuantity() - occupied);
                    return toyMapper.toResponseWithAvailability(toy, available);
                })
                .toList();

        int startIdx = (int) pageable.getOffset();
        int endIdx = Math.min((startIdx + pageable.getPageSize()), allResponses.size());

        if (startIdx > allResponses.size()) {
            return new PageImpl<>(Collections.emptyList(), pageable, allResponses.size());
        }

        List<ToyResponse> pageContent = allResponses.subList(startIdx, endIdx);

        return new PageImpl<>(pageContent, pageable, allResponses.size());
    }

    public void updateToy(@Valid ToyUpdate dto, Long id) {
        Toy toy = findById(id);
        toyMapper.updateEntityFromDto(dto, toy);
        toyRepository.save(toy);
    }

    public void delete(Long id) {
        Toy toy = findById(id);
        toyRepository.delete(toy);
    }

    public Toy findById(Long id){
        return toyRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("A toy Id not found or not exist.")
        );
    }

}
