package com.iksgmbh.fileman.backend.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.iksgmbh.fileman.backend.Tenant;
import com.iksgmbh.fileman.backend.dao.TenantDao;
import com.iksgmbh.fileman.backend.exception.ResourceNotFoundException;
import com.iksgmbh.fileman.backend.jwt.JwtTokenUtil;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TenantRestController
{
	@Autowired
	private TenantDao tenantDao;

	@GetMapping("/tenants")
	public List<Tenant> findAllTenants(@RequestHeader("Authorization") String authHeader) {
		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		return tenantDao.findAllTenants();
	}

    @GetMapping("/tenants/{id}")
    public Tenant findTenantById(@RequestHeader("Authorization") String authHeader,
            @PathVariable Integer id) {

		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		Tenant tenant = tenantDao.findById(id);
		if (tenant == null) {
			throw new ResourceNotFoundException("Tenant '" + id +"' + not found.");
		}
		return tenant;
   }

	@PostMapping("/tenants")
	public Integer createTenant(@RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody Tenant tenant) {

		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		return tenantDao.create(tenant).getId();
    }

	@PutMapping("/tenants")
	public void updateTenant(@RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody Tenant tenant) {

		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		boolean ok = tenantDao.update(tenant);
		if (! ok) {
			throw new ResourceNotFoundException("Tenant '" + tenant.getId() +"' + not found for update.");
		}
	}

	@DeleteMapping("/tenants/{id}")
	public ResponseEntity<?> deleteTenant(@RequestHeader("Authorization") String authHeader,
            @PathVariable Integer id) {

		JwtTokenUtil.validateTokenFromAuthHeader(authHeader);

		Tenant tenant = tenantDao.findById(id);
		if (tenant == null) {
			throw new ResourceNotFoundException("Tenant '" + id +"' + not found.");
		}
		tenantDao.delete(tenant);
		return ResponseEntity.ok().build();
	}
}