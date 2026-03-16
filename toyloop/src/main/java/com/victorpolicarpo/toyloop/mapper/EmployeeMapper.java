package com.victorpolicarpo.toyloop.mapper;

import com.victorpolicarpo.toyloop.dto.request.EmployeeRequest;
import com.victorpolicarpo.toyloop.dto.response.EmployeeResponse;
import com.victorpolicarpo.toyloop.dto.update.EmployeeUpdate;
import com.victorpolicarpo.toyloop.entity.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface EmployeeMapper {
    Employee toEntity(EmployeeRequest dto);
    EmployeeResponse toResponse(Employee entity);
    @Mapping(target = "isAvailable", source = "available")
    EmployeeResponse toResponseWithAvailability(Employee entity, Boolean available);
    void updateEntityFromDto(EmployeeUpdate dto, @MappingTarget Employee entity);
    List<EmployeeResponse> toResponseList(List<Employee> listEntity);



}
