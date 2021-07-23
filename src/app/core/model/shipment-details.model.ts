
export class ShipmentDetails {

    private client_id!:number;
    private first_name!: string;
    private last_name!: string;
    private email!: string;      
    private destenation_latitude!: number
    private destenation_longitude!: number
    private destenation_state?: string;
    private destenation_country!: string;
    private destenation_city!: string;
    private destenation_street_address!: string;

    constructor(
        client_id:number,
        first_name: string,
        last_name: string,
        email: string,
        destenation_latitude: number,
        destenation_longitude: number,
        destenation_state: string,
        destenation_country: string,
        destenation_city: string,
        destenation_street_address: string
    ) {
        this.client_id = client_id
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.destenation_latitude = destenation_latitude;
        this.destenation_longitude = destenation_longitude 
        this.destenation_state = destenation_state;
        this.destenation_country = destenation_country;
        this.destenation_city = destenation_city;
        this.destenation_street_address = destenation_street_address;
    }

    get getClient_id(): number {
        return this.client_id!;
    }

    public setClient_id(client_id: number): void {
        this.client_id! = client_id!;
    }

    public getFirst_name(): string {
        return this.first_name!;
    }

    public setFirst_name(first_name: string): void {
        this.first_name! = first_name!;
    }

    public getLast_name(): string {
        return this.last_name!;
    }

    public setLast_name(last_name: string): void {
        this.last_name! = last_name!;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email! = email;
    }

    public getDestenation_latitude(): number {
        return this.destenation_latitude!;
    }

    public setDestenation_latitude(destenation_latitude: number): void {
        this.destenation_latitude! = destenation_latitude!;
    }

    public getDestenation_longitude(): number {
        return this.destenation_longitude;
    }

    public setDestenation_longitude(destenation_longitude: number): void {
        this.destenation_longitude! = destenation_longitude!;
    }

    public getDestenation_state(): string | undefined{
        return this.destenation_state;
    }

    public setDestenation_state(destenation_state: string): void {
        this.destenation_state = destenation_state
    }

    public getDestenation_country(): string {
        return this.destenation_country!;
    }

    public setDestenation_country(destenation_country: string): void {
        this.destenation_country! = destenation_country!;
    }

    public getDestenation_city(): string {
        return this.destenation_city!;
    }

    public setDestenation_city(destenation_city: string): void {
        this.destenation_city = destenation_city!;
    }

    public getDestenation_street_address(): string {
        return this.destenation_street_address!;
    }

    public setDestenation_street_address(destenation_street_address: string): void {
        this.destenation_street_address = destenation_street_address;
    }



}