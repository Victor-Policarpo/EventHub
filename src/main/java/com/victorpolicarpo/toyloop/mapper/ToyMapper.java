package com.victorpolicarpo.toyloop.mapper;

import com.victorpolicarpo.toyloop.dto.request.ToyRequest;
import com.victorpolicarpo.toyloop.dto.response.ToyResponse;
import com.victorpolicarpo.toyloop.dto.update.ToyUpdate;
import com.victorpolicarpo.toyloop.entity.Toy;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ToyMapper {
    Toy toEntity(ToyRequest dto);
    ToyResponse toResponse(Toy entity);
    void updateEntityFromDto(ToyUpdate dto, @MappingTarget Toy entity);
    List<ToyResponse> toResponseList(List<Toy> listEntity);
}
