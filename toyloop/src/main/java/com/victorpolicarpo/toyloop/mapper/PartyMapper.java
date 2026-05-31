package com.victorpolicarpo.toyloop.mapper;

import com.victorpolicarpo.toyloop.dto.request.PartyRequest;
import com.victorpolicarpo.toyloop.dto.response.*;
import com.victorpolicarpo.toyloop.dto.update.PartyUpdate;
import com.victorpolicarpo.toyloop.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface PartyMapper {
    Party toEntity(PartyRequest dto);

    PartyToy toPartyToy(Party entity);

    @Mapping(target = "createBy", source = "userResponse")
    PartyResponse toResponse(Party party, UserSimpleResponse userResponse);

    @Mapping(target = "toyId", source = "toy")
    @Mapping(target = "name", source = "toy")
    @Mapping(target = "quantity", source = "quantity")
    PartyToyResponse toPartyToyResponse(PartyToy partyToy);

    default Long mapToyId(Toy toy) {
        return (toy != null) ? toy.getToyId() : null;
    }

    default String mapToyName(Toy toy){
        return (toy != null) ? toy.getName() : "Toy Unavailable";
    }

    EmployeePartyResponse toEmployeeResponse(Employee employee);

    ListPartyResponse toListPartyResponse(Party entity);

    @Mapping(target = "employees", ignore = true)
    @Mapping(target = "partyToys", ignore = true)
    void updateEntityFromDto(PartyUpdate dto, @MappingTarget Party entity);

}

